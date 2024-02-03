/*
  Warnings:

  - Added the required column `grandTotal` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppn` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `grandTotal` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `ppn` DECIMAL(65, 30) NOT NULL;
