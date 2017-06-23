
function ANNAnnonceAdd(DBManager){
    this.annonce = {};
    
    this.save = function (annonce) {
        this.annonce = angular.copy(annonce)
        console.log(this.annonce);
    }
}