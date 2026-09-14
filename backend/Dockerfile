# Use an official PHP image with Apache pre-installed
FROM php:8.2-apache

# Enable Apache mod_rewrite for custom API handling if needed
RUN a2enmod rewrite

# Copy all your backend PHP files into the server's web directory
COPY . /var/www/html/

# Expose port 80 for web traffic
EXPOSE 80
