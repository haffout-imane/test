-- DropForeignKey
ALTER TABLE "public"."Domain" DROP CONSTRAINT "Domain_clientId_fkey";

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
