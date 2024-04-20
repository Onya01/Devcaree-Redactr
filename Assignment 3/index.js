function redactText() {
    const originalText = document.getElementById('originalText').value;
    const wordsToRedact = document.getElementById('wordsToRedact').value.split(" ");
    const replacement = getReplacement();

    const regex = new RegExp(wordsToRedact.join('|'), 'gi');
    const redactedText = originalText.replace(regex, match => replacement.repeat(match.length));

    document.getElementById('redactedText').textContent = redactedText;

    displayStats(originalText, wordsToRedact, redactedText);
}

function resetForm() {
    document.getElementById('originalText').value = "";
    document.getElementById('wordsToRedact').value = "";
    document.getElementById('replacement').value = "****";
    document.getElementById('customReplacement').style.display = "none";
    document.getElementById('customReplacement').value = "";
    document.getElementById('redactedText').textContent = "";
    document.getElementById('stats').textContent = "";
}

function getReplacement() {
    const replacementSelect = document.getElementById('replacement');
    const selectedOption = replacementSelect.options[replacementSelect.selectedIndex].value;

    if (selectedOption === 'custom') {
        document.getElementById('customReplacement').style.display = "inline";
        return document.getElementById('customReplacement').value;
    } else {
        document.getElementById('customReplacement').style.display = "none";
        return selectedOption;
    }
}

function displayStats(originalText, wordsToRedact, redactedText) {
    const wordsScanned = originalText.split(/\s+/).length;
    const wordsMatched = originalText.match(new RegExp(wordsToRedact.join('|'), 'gi'))?.length || 0;
    const charactersScrambled = redactedText.length;
    const stats = `Words scanned: ${wordsScanned}<br>
                   Words matched: ${wordsMatched}<br>
                   Characters scrambled: ${charactersScrambled}`;
    document.getElementById('stats').innerHTML = stats;
}
