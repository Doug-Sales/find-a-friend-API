/*
  Warnings:

  - Made the column `phone` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal_code` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "postal_code" SET NOT NULL;
