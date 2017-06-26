
function ANNAnnonceAdd(DBManager){
    var vm = this;
    this.annonce = {};
    
    this.save = function (annonce) {
        vm.annonce = angular.copy(annonce)

        DBManager.save('ANNAnnonce', vm.annonce)
            .then(function (annonce) {
                // annonce est l'annonce mise à jour
                // ou enregistrée
                ici.model = annonce;
                console.log(annonce)
            })
            .catch(function (error) {
                console.log(error)
            });
    }
}