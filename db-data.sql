CREATE TABLE IF NOT EXISTS `users`(`id` MEDIUMINT NOT NULL AUTO_INCREMENT, `username` CHAR(30) NOT NULL, `password` CHAR(30) NOT NULL, PRIMARY KEY (`id`));

INSERT INTO `users` (`username`, `password`) VALUES 
    ('user1', 'password1'),
    ('user2', 'password2'),
    ('user3', 'password3');

CREATE TABLE IF NOT EXISTS `cities`(`id` MEDIUMINT NOT NULL AUTO_INCREMENT, `name` CHAR(30) NOT NULL, `coordinate` POINT NOT NULL, SPATIAL INDEX `SPATIAL` (`coordinate`), PRIMARY KEY (`id`));

INSERT INTO `cities` (`name`, `coordinate`) VALUES
    ('Poznań', POINT(52.409538, 16.931992)),
    ('Gdańsk', POINT(54.372158, 18.638306)),
    ('Gdynia', POINT(54.372158, 18.638306)), 
    ('Wrocław', POINT(51.107883, 17.038538)),
    ('Kraków', POINT(50.049683, 19.944544));

