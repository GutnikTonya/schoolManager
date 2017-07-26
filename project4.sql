-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2017 at 02:37 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project4`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `imageFileName` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hebrew ROW_FORMAT=COMPACT;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `imageFileName`) VALUES
(1, 'kung fu', 'sport', 'kungFu.jpg'),
(2, 'Millennium Falcon ', 'spaceship license', 'millennium-falcon.jpg'),
(3, 'Magical Theory', 'Hogwarts', 'magic.jpg'),
(4, 'Mutant Biology', 'Biology', 'mutant1.jpg'),
(5, 'Full Stack Developer', 'WEB', 'fullstack.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `imageFileName` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hebrew ROW_FORMAT=COMPACT;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `phone`, `email`, `password`, `role`, `imageFileName`) VALUES
(1, 'Assaf', 'Finkelshtein', '111111111111', 'Assaf@gmail.com', '$2y$10$sSWDUnjFdWvVJTGG06Ru7uYffytGNxbkvaiedxZddmT3Wr4D69JSC', 'teacher', 'assaf.png'),
(2, 'Charles\r\n', 'Xavier', '0540000001', 'charles@gmail.com', '$2y$10$l0tsAKbrSLEurcvyzVxl8u4Uete4E4TGb29uw6mcEMAw2rahMBEqe', 'teacher', 'Charles.jpeg'),
(3, 'Master', 'Yoda', '0540000002', 'Yoda@gmail.com', '$2y$10$6Hlw1joJqw988pqXqWnxzOExH25x/PmZYQ3JqkkgdydAc7w1J9UZC', 'teacher', 'Yoda.jpg'),
(4, 'Professor', 'Dumbledore', '0540000003', 'Dumbledore@gmail.com', '$2y$10$piLPh/6AHpx2EMS1QBI3VufTw7dW1LDr9Xpw7XRhdywSFylZuiC.O', 'teacher', 'ProfessorDumbledore.jpg'),
(5, 'Master', 'Shifu', '0540000005', 'Shifu@gmail.com', '$2y$10$UlUuPMiwCGdWZlsD4gsBJ.46tpnJZ07Y1BQkPLqbL.1/IzbHySWf2', 'teacher', 'MasterShifu.jpg'),
(6, 'Tonya', 'Gutnik', '0549408687', 'gutnik.tonya@gmail.com', '$2y$10$4RPvtPQWss8NGn6LxuJVZONXHPXuKFm54OL87eKAVTYn2PHUHIMXy', 'student', 'tonya.jpg'),
(7, 'George', 'Gutnik', '0547659500', 'gutnik.george@gmail.com', '$2y$10$JEsYzPl35ahAjJLKYkpzJOW.8tzJmi4iz1LC/dC5LEaDJ8YGqXLfq', 'student', 'george.jpg'),
(8, 'Luke', 'Skywalker', '0540000005', 'Luke@gmail.com', '$2y$10$zRBRFN6U4ZoZ1w8XIsnHUeMFziQz9A2WrsWa53X9ieFMvkkGk3Hr2', 'student', 'LukeSkywalker.png'),
(9, 'Harry', 'Potter', '0540000006', 'Potter@gmail.com', '$2y$10$I0obLi8ZGssVsgusv7wIUuxaT4/6nx4rZaZtaeWu7lNOO9G4fRGsK', 'student', 'harry.png'),
(10, 'KungFu', 'Panda', '0540000010', 'Panda@gmail.com', '$2y$10$wYPed9DVftVGQ0EUnX....kCamfA5Bf09b7rleGb3QFl0Sav412dq', 'student', 'KungFuPanda.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `usercourses`
--

CREATE TABLE `usercourses` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `CourseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usercourses`
--

INSERT INTO `usercourses` (`id`, `userID`, `CourseID`) VALUES
(255, 6, 2),
(256, 6, 3),
(257, 6, 5),
(258, 7, 2),
(259, 7, 3),
(260, 7, 4),
(261, 7, 5),
(262, 8, 2),
(263, 9, 3),
(264, 10, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usercourses`
--
ALTER TABLE `usercourses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usercourses_fk0` (`userID`),
  ADD KEY `usercourses_fk1` (`CourseID`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `usercourses`
--
ALTER TABLE `usercourses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `usercourses`
--
ALTER TABLE `usercourses`
  ADD CONSTRAINT `usercourses_fk0` FOREIGN KEY (`userID`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `usercourses_fk1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
