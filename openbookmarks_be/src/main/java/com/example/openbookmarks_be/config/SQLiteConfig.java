package com.example.openbookmarks_be.config;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SQLiteConfig {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.driver-class-name}")
    private String dbDriverClassName;

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url(dbUrl)
                .driverClassName(dbDriverClassName)
                .build();
    }
}