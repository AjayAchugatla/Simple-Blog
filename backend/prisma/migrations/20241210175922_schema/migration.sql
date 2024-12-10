/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyOtpExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
DROP COLUMN "resetExpiry",
DROP COLUMN "resetOtp",
DROP COLUMN "verifyOtp",
DROP COLUMN "verifyOtpExpiry";
