-- AlterTable
ALTER TABLE `User` ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT 'User',
    ADD COLUMN `avatar` VARCHAR(191) NULL;

-- Update existing users with default username based on email
UPDATE `User` SET `username` = SUBSTRING_INDEX(email, '@', 1) WHERE `username` = 'User';
