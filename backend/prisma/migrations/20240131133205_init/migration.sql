-- AddForeignKey
ALTER TABLE `Purchasedetail` ADD CONSTRAINT `Purchasedetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
