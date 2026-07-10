BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [branchId] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [User_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Branch] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [slug] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Branch_status_df] DEFAULT 'active',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Branch_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Branch_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Branch_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] NVARCHAR(1000) NOT NULL,
    [nameTr] NVARCHAR(1000) NOT NULL,
    [nameEn] NVARCHAR(1000),
    [displayOrder] INT NOT NULL CONSTRAINT [Category_displayOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Category_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Category_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] NVARCHAR(1000) NOT NULL,
    [nameTr] NVARCHAR(1000) NOT NULL,
    [nameEn] NVARCHAR(1000),
    [descTr] NVARCHAR(1000),
    [descEn] NVARCHAR(1000),
    [imagePath] NVARCHAR(1000),
    [defaultPrice] DECIMAL(10,2) NOT NULL,
    [categoryId] NVARCHAR(1000) NOT NULL,
    [displayOrder] INT NOT NULL CONSTRAINT [Product_displayOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Product_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Product_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductBranchOverride] (
    [id] NVARCHAR(1000) NOT NULL,
    [productId] NVARCHAR(1000) NOT NULL,
    [branchId] NVARCHAR(1000) NOT NULL,
    [price] DECIMAL(10,2),
    [stockStatus] NVARCHAR(1000) NOT NULL CONSTRAINT [ProductBranchOverride_stockStatus_df] DEFAULT 'available',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ProductBranchOverride_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ProductBranchOverride_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ProductBranchOverride_productId_branchId_key] UNIQUE NONCLUSTERED ([productId],[branchId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [User_branchId_idx] ON [dbo].[User]([branchId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Category_displayOrder_idx] ON [dbo].[Category]([displayOrder]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Product_categoryId_idx] ON [dbo].[Product]([categoryId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Product_displayOrder_idx] ON [dbo].[Product]([displayOrder]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ProductBranchOverride_branchId_idx] ON [dbo].[ProductBranchOverride]([branchId]);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_branchId_fkey] FOREIGN KEY ([branchId]) REFERENCES [dbo].[Branch]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Product] ADD CONSTRAINT [Product_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductBranchOverride] ADD CONSTRAINT [ProductBranchOverride_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductBranchOverride] ADD CONSTRAINT [ProductBranchOverride_branchId_fkey] FOREIGN KEY ([branchId]) REFERENCES [dbo].[Branch]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
