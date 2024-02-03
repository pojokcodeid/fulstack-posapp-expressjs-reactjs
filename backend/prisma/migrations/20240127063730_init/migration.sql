/*
  Warnings:

  - You are about to drop the column `phome` on the `supplier` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `phome`,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;
