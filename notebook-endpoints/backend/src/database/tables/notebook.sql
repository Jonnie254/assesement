-- Drop the existing Notes table
DROP TABLE IF EXISTS Notes;

-- Recreate the Notes table without the IDENTITY property
CREATE TABLE Notes (
  ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  Title NVARCHAR(255) NOT NULL,
  Content NVARCHAR(MAX) NOT NULL,
  CreatedAt DATETIME DEFAULT GETDATE()
);
