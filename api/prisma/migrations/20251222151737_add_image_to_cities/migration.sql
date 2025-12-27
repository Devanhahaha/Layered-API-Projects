/*
  Warnings:

  - Added the required column `image` to the `Cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cities" ADD COLUMN     "image" TEXT NOT NULL;
