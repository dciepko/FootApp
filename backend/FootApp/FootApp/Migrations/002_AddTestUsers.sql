-- Dodanie testowych użytkowników do tabeli Users
USE GoalVisionDb;
GO

INSERT INTO [GoalVisionSchema].[Users] ([FirstName], [LastName], [Email], [Active])
VALUES 
    ('Test1', 'Test', 'test1@example.com', 1),
    ('Test2', 'Test', 'test2@example.com', 1),
    ('Test3', 'Test', 'test3@example.com', 0);
GO

PRINT 'Test users added successfully.';
