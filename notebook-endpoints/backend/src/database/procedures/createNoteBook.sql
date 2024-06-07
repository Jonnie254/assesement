CREATE OR ALTER PROCEDURE createNotebook(
    @id VARCHAR(255),
    @title VARCHAR(255),
    @content VARCHAR(255),
    @createdAt VARCHAR(255)
)
AS
BEGIN
   insert into Notes (id, title, content, createdAt) values 
    (@id, @title, @content, @CreatedAt);
END