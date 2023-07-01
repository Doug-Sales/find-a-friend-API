/*
  Warnings:

  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postal_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "animal" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "images" TEXT;
