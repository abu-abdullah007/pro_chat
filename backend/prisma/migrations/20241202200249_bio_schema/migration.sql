-- AlterTable
ALTER TABLE `Message` MODIFY `message` VARCHAR(4000) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `bio` VARCHAR(50) NULL;
