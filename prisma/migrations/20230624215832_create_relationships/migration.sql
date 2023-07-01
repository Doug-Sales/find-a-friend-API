/*
  Warnings:

  - Made the column `phone` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "org_id" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
