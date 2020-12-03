#!/bin/bash
PHPRC=/var/www/users/sdmay21-51/.php
export PHPRC
PHP_FCGI_CHILDREN=4
export PHP_FCGI_CHILDREN
PHP_FCGI_MAX_REQUESTS=5000
export PHP_FCGI_MAX_REQUESTS
exec /usr/bin/php-cgi
