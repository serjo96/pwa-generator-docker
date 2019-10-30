module.exports = function(count) {
    let numberCount = Number(count);
    let fullNumber = Math.floor(numberCount);
    let res = '';
    new Array(5).fill(null).forEach((u, i) => {
        if(i+1 <= fullNumber){
            res += `<i aria-hidden="true" class="v-icon v-icon--link material-icons theme--light grey--text text--darken-2" style="font-size: 16px;">
                ${numberCount % 1 === 0 || i+1 !== fullNumber ? 'star' : 'star_half'}
            </i>`
        } else {
            res += '<i aria-hidden="true" class="v-icon v-icon--link material-icons theme--light grey--text text--lighten-1" style="font-size: 16px;">star</i>'
        }
    });
    return res;
};

