/*
  Warnings:

  - Added the required column `orderId` to the `Orderreturn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderreturn` ADD COLUMN `orderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Orderreturn` ADD CONSTRAINT `Orderreturn_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
