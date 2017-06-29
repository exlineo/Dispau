-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Client :  exlineodev.mysql.db
-- Généré le :  Mar 27 Juin 2017 à 12:03
-- Version du serveur :  5.5.55-0+deb7u1-log
-- Version de PHP :  5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `exlineodev`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonce`
--

CREATE TABLE IF NOT EXISTS `annonce` (
  `id_nb` int(11) NOT NULL,
  `nom_str` varchar(255) NOT NULL,
  `image_img` varchar(255) NOT NULL,
  `dateCreation_dat` bigint(20) NOT NULL,
  `dateFinInscriptions_dat` bigint(20) NOT NULL,
  `dateFin_dat` bigint(20) NOT NULL,
  `dateDebut_dat` bigint(20) NOT NULL,
  `idLieu_nb` int(11) NOT NULL,
  `personnesMin_nb` int(11) NOT NULL,
  `personnesMax_nb` int(11) NOT NULL,
  `idGestionnaire_nb` int(11) NOT NULL,
  `idChat_nb` int(11) NOT NULL,
  `salleDAttente_ar` varchar(255) NOT NULL,
  `participants_ar` varchar(255) NOT NULL,
  `centreDInterets_ar` varchar(255) NOT NULL COMMENT 'objet json',
  `validite_bl` tinyint(1) NOT NULL DEFAULT '0',
  `annulee_bl` tinyint(1) NOT NULL DEFAULT '0',
  `modifications` text NOT NULL,
  `personnesBannies_ar` varchar(255) NOT NULL,
  `description_str` varchar(255) NOT NULL,
  `limiteAge_nb` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `centreDInteret`
--

CREATE TABLE IF NOT EXISTS `centreDInteret` (
  `id_nb` int(11) NOT NULL,
  `nom_str` varchar(255) NOT NULL,
  `modifications` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `demandeAmi`
--

CREATE TABLE IF NOT EXISTS `demandeAmi` (
  `id_nb` int(11) NOT NULL,
  `demandeur_nb` int(11) NOT NULL COMMENT 'id utilisateur envoyant la demande',
  `cible_nb` int(11) NOT NULL COMMENT 'id de l''utilisateur demandé',
  `dateDemande_dat` bigint(20) NOT NULL,
  `modifications` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `lieu`
--

CREATE TABLE IF NOT EXISTS `lieu` (
  `id_nb` int(11) NOT NULL,
  `nom_str` varchar(255) NOT NULL,
  `idChat_nb` int(11) NOT NULL,
  `longitude_nb` decimal(13,10) NOT NULL,
  `latitude_nb` decimal(13,10) NOT NULL,
  `annonces_ar` varchar(255) NOT NULL,
  `sousLieux_ar` varchar(255) NOT NULL,
  `utilisateur_ar` varchar(255) NOT NULL,
  `adresse_str` varchar(255) NOT NULL,
  `description_str` varchar(255) NOT NULL,
  `image_img` varchar(255) NOT NULL,
  `idAdmin_nb` int(11) NOT NULL,
  `modifications` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `id_nb` int(11) NOT NULL,
  `idChat_nb` int(11) NOT NULL,
  `date_dat` bigint(20) NOT NULL,
  `banni_nb` tinyint(4) NOT NULL,
  `contenu_str` varchar(255) NOT NULL,
  `idExpediteur_nb` int(11) NOT NULL,
  `modifications` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sousLieu`
--

CREATE TABLE IF NOT EXISTS `sousLieu` (
  `id_nb` int(11) NOT NULL,
  `nom_str` varchar(255) NOT NULL,
  `lieuParent_nb` int(11) NOT NULL,
  `lieuPrincipal_nb` int(11) NOT NULL,
  `sousLieu_ar` varchar(255) NOT NULL COMMENT 'liste des sous lieux d''un sous lieu',
  `modifications` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_nb` int(10) unsigned NOT NULL,
  `pseudo_str` varchar(50) NOT NULL,
  `prenom_str` varchar(255) NOT NULL,
  `pass_str` varchar(255) NOT NULL,
  `email_str` varchar(255) NOT NULL,
  `description_str` varchar(255) NOT NULL,
  `nom_str` varchar(255) NOT NULL,
  `dateInscription_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `abonnementLieu_ar` varchar(255) NOT NULL,
  `notificationRecue_ar` varchar(255) NOT NULL,
  `demandeAmi_ar` varchar(255) NOT NULL,
  `ami_ar` varchar(255) NOT NULL,
  `annonceParticipee_ar` varchar(255) NOT NULL,
  `grade_nb` tinyint(4) NOT NULL,
  `photoProfil_img` varchar(255) NOT NULL,
  `modifications` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_nb`, `pseudo_str`, `prenom_str`, `pass_str`, `email_str`, `description_str`, `nom_str`, `dateInscription_date`, `abonnementLieu_ar`, `notificationRecue_ar`, `demandeAmi_ar`, `ami_ar`, `annonceParticipee_ar`, `grade_nb`, `photoProfil_img`, `modifications`) VALUES
(1, 'Boby', 'Mora', '1234', 'stenm@gmail.com', '"Il faut oser, toujours oser, encore oser"', 'Bob', '2017-06-13 22:00:00', '', '', '', '', '', 0, '', '');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD PRIMARY KEY (`id_nb`);

--
-- Index pour la table `centreDInteret`
--
ALTER TABLE `centreDInteret`
  ADD PRIMARY KEY (`id_nb`);

--
-- Index pour la table `demandeAmi`
--
ALTER TABLE `demandeAmi`
  ADD PRIMARY KEY (`id_nb`);

--
-- Index pour la table `lieu`
--
ALTER TABLE `lieu`
  ADD PRIMARY KEY (`id_nb`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_nb`);

--
-- Index pour la table `sousLieu`
--
ALTER TABLE `sousLieu`
  ADD PRIMARY KEY (`id_nb`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_nb`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `annonce`
--
ALTER TABLE `annonce`
  MODIFY `id_nb` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `centreDInteret`
--
ALTER TABLE `centreDInteret`
  MODIFY `id_nb` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `demandeAmi`
--
ALTER TABLE `demandeAmi`
  MODIFY `id_nb` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `lieu`
--
ALTER TABLE `lieu`
  MODIFY `id_nb` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_nb` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `sousLieu`
--
ALTER TABLE `sousLieu`
  MODIFY `id_nb` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_nb` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
