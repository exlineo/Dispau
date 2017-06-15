-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Client :  exlineodev.mysql.db
-- Généré le :  Mer 14 Juin 2017 à 18:25
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
-- Structure de la table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(10) unsigned NOT NULL,
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
  `grade_nb` tinyint(4) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `pseudo_str`, `prenom_str`, `pass_str`, `email_str`, `description_str`, `nom_str`, `dateInscription_date`, `abonnementLieu_ar`, `notificationRecue_ar`, `demandeAmi_ar`, `ami_ar`, `annonceParticipee_ar`, `grade_nb`) VALUES
(1, 'Boby', 'Mora', '1234', 'stenm@gmail.com', '"Il faut oser, toujours oser, encore oser"', 'Bob', '2017-06-13 22:00:00', '', '', '', '', '', 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
