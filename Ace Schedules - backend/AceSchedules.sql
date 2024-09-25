-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2024 at 02:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aceschedules`
create database aceschedules;
use aceschedules;
--

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '201024';

-- --------------------------------------------------------

--
-- Table structure for table `cadastro`
--

CREATE TABLE `cadastro` (
  `id` int(11) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `usertype` varchar(140) NOT NULL,
  `telefone` varchar(21) NOT NULL,
  `cnpj` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cadastro`
--

INSERT INTO `cadastro` (`id`, `usuario`, `email`, `senha`, `usertype`, `telefone`, `cnpj`) VALUES
(1, 'ETPCE', 'ETPC@ETPCEEE', '1233445', 'Empresa', '(12) 2222-2222', '22.222.222/2222-22'),
(88, '554', '332@22', '232', 'Administrador', '(12) 2222-2223', '33.333.333/3333-33');

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--
CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `dataAgendamentoInicial` datetime(6) NOT NULL,
  `dataAgendamentoFinal` datetime(6) NOT NULL,
  `sala` int(11) NOT NULL,
  `usuario` int(11) NOT NULL DEFAULT 1,
  `status` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservas`
--

INSERT INTO `reservas` (`id`, `dataAgendamentoInicial`, `dataAgendamentoFinal`, `sala`, `usuario`, `status`) VALUES
(13601, '2024-04-05 04:44:00', '2024-04-05 04:44:00', 212, 1, b'1'),
(13602, '2024-05-05 16:56:00', '2024-04-05 04:44:00', 212, 1, b'1'),
(13603, '2024-07-31 21:35:00', '2024-04-05 04:44:00', 212, 88, b'1'),
(13605, '2024-01-01 18:34:00', '2024-04-05 04:44:00', 212, 1, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `salas`
--
CREATE TABLE `salas` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `status` varchar(55) NOT NULL DEFAULT '0',
  `backImg` varchar(255) NOT NULL,
  `caracteristicas` JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salas`
--

INSERT INTO `salas` (`id`, `nome`, `descricao`, `status`, `backImg`, `caracteristicas`) 
VALUES ('1', 'Sala 1', 'Descrição da sala 1', '1', 'imagem.jpg', '["Wifi", "Ar condicionado", "Projetor"]');


--
-- Indexes for dumped tables
--









--
-- Indexes for table `cadastro`
--
ALTER TABLE `cadastro`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telefone` (`telefone`),
  ADD UNIQUE KEY `cnpj` (`cnpj`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservas_cadastros` (`usuario`),
  ADD KEY `reservas_salas` (`sala`);

--
-- Indexes for table `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cadastro`
--
ALTER TABLE `cadastro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13606;

--
-- AUTO_INCREMENT for table `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- Constraints for dumped tables
--
use aceschedules;
ALTER TABLE cadastro MODIFY COLUMN senha VARCHAR(250);
ALTER TABLE cadastro MODIFY COLUMN telefone VARCHAR(21);

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_cadastros` FOREIGN KEY (`usuario`) REFERENCES `cadastro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_salas` FOREIGN KEY (`sala`) REFERENCES `salas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
