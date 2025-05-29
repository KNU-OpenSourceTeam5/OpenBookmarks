package com.example.openbookmarks_be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;

import javax.sql.DataSource;

@Configuration
public class SqliteConfig {

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:sqlite:openbookmarks.db")
                .driverClassName("org.sqlite.JDBC")
                .build();
    }
}