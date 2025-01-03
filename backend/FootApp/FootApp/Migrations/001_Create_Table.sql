-- Tworzenie bazy danych GoalVisionDb
IF DB_ID('GoalVisionDb') IS NULL
BEGIN
    CREATE DATABASE GoalVisionDb;
    PRINT 'GoalVisionDb database created successfully.';
END;
GO

-- Używanie bazy danych GoalVisionDb
USE GoalVisionDb;
GO

-- Ustawienia dla tabel
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- Tworzenie schematu GoalVisionSchema, jeśli nie istnieje
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'GoalVisionSchema')
BEGIN
    EXEC('CREATE SCHEMA GoalVisionSchema');
END;
GO

-- Tabela Auth
CREATE TABLE [GoalVisionSchema].[Auth] (
    [Email] NVARCHAR(255) NULL,
    [PasswordHash] VARBINARY(MAX) NULL,
    [PasswordSalt] VARBINARY(MAX) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];
GO

-- Tabela Users
CREATE TABLE [GoalVisionSchema].[Users] (
    [UserId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,
    [FirstName] NVARCHAR(100) NOT NULL,
    [LastName] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [Active] BIT NOT NULL
) ON [PRIMARY];
GO

-- Dodanie unikalnego indeksu na kolumnie Email w tabeli Users
ALTER TABLE [GoalVisionSchema].[Users] ADD CONSTRAINT UQ_Email UNIQUE NONCLUSTERED ([Email] ASC);
GO

-- Tabela FavouriteClubs
CREATE TABLE [GoalVisionSchema].[FavouriteClubs] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,
    [UserId] INT NOT NULL,
    [ClubId] INT NOT NULL,
    [ViewCount] INT NOT NULL,
    CONSTRAINT FK_FavouriteClubs_Users FOREIGN KEY ([UserId]) REFERENCES [GoalVisionSchema].[Users] ([UserId]) ON DELETE CASCADE
) ON [PRIMARY];
GO

-- Tabela FavouritePlayers
CREATE TABLE [GoalVisionSchema].[FavouritePlayers] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,
    [UserId] INT NOT NULL,
    [PlayerId] INT NOT NULL,
    [ViewCount] INT NOT NULL,
    [LeagueId] INT NOT NULL,
    CONSTRAINT FK_FavouritePlayers_Users FOREIGN KEY ([UserId]) REFERENCES [GoalVisionSchema].[Users] ([UserId]) ON DELETE CASCADE
) ON [PRIMARY];
GO
