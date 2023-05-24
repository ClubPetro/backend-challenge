-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
