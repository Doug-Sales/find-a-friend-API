/*
  Warnings:

  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Made the column `animal` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "animal" SET NOT NULL;
