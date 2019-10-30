module.exports = function(counts, countName, className) {
    const maxCount = Math.max(...Object.values(counts));
    const targetCount = counts[countName];
    const width = (targetCount * 100) / maxCount;

    return `<div class="v-progress-linear__bar__determinate ${className}" style="width: ${width}%;"></div>`;
};

