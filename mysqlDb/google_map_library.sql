-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2022 at 11:45 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `google_map_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `Id` int(11) NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `location_lat` float NOT NULL,
  `location_lng` float NOT NULL,
  `marker_image` text NOT NULL,
  `title` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`Id`, `location_name`, `location_lat`, `location_lng`, `marker_image`, `title`) VALUES
(1, 'Indore', 22.7196, 75.8577, 'https://amw-task.amwebtech.org/assets/marker/indore.jpg', 'Indore Location'),
(2, 'Bhopal', 23.2599, 77.4126, 'https://amw-task.amwebtech.org/assets/marker/bhopal.jpg', 'Bhopal'),
(3, 'Raisen', 23.3327, 77.7824, 'https://amw-task.amwebtech.org/assets/marker/raisen.jpg', 'Raisen'),
(4, 'Ujjain', 23.1765, 75.7885, 'https://amw-task.amwebtech.org/assets/marker/ujjain.jpg', 'Ujjain'),
(5, 'Dewas', 22.9676, 76.0534, 'https://amw-task.amwebtech.org/assets/marker/dewas.jpg', 'Dewas'),
(6, 'Shajapur', 23.4273, 76.273, 'https://amw-task.amwebtech.org/assets/marker/shajapur.jpg', 'Shajapur'),
(7, 'Jabalpur', 23.1815, 79.9864, 'https://amw-task.amwebtech.org/assets/marker/jabalpur.jpg', 'Jabalpur'),
(8, 'Raipur', 21.25, 81.63, 'https://amw-task.amwebtech.org/assets/marker/raipur.jpg', 'Raipur'),
(9, 'Mumbai', 18.5204, 73.8567, 'https://amw-task.amwebtech.org/assets/marker/mumbai.jpg', 'Mumbai'),
(10, 'Pune', 18.5204, 73.8567, 'https://amw-task.amwebtech.org/assets/marker/pune.jpg', 'Pune'),
(11, 'Agra', 27.1767, 78.0081, 'https://amw-task.amwebtech.org/assets/marker/agra.jpg', 'Agra'),
(12, 'Delhi', 28.7041, 77.1025, 'https://amw-task.amwebtech.org/assets/marker/delhi.jpg', 'Delhi'),
(13, 'Jaipur', 26.9124, 75.7873, 'https://amw-task.amwebtech.org/assets/marker/jaipur.jpg', 'Jaipur'),
(14, 'Bengaluru', 12.9716, 77.5946, 'https://amw-task.amwebtech.org/assets/marker/banglore.jpg', 'Bengaluru');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
