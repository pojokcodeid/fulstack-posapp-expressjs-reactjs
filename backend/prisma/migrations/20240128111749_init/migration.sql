/*
  Warnings:

  - Added the required column `qty` to the `Carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carts` ADD COLUMN `qty` INTEGER NOT NULL;
