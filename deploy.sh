#!/bin/bash
set -x
# Name in dist directory
APPNAME=rxjs6
APACHE_ROOT=/var/www/html
DATE=`date '+%Y-%m-%d.%H:%M:%S'`
if [ -d dist/$APPNAME ] 
then
	rm -r "dist/$APPNAME"
fi
APACHE_CONFIG=/etc/apache2/sites-enabled/000-default.conf
DOCUMENTROOT=`awk '/DocumentRoot/ { print $2 }' $APACHE_CONFIG`
[ -d $DOCUMENROOT ] \
	&& rm -rf $DOCUMENTROOT/$APPNAME \
	&& mkdir $DOCUMENTROOT/$APPNAME
if [ $? -ne 0 ]
then
	echo "Failed to remove/create $DOCUMENTROOT/$APPNAME directory." 
fi

ng build --prod --base-href /$APPNAME/ 
#	&& ssh rpi3 mv /var/www/html/$APPNAME "/var/www/html/$APPNAME.$DATE"
#echo p -r dist/$APPNAME/ rpi3:/var/www/html
#scp -r dist/$APPNAME/ rpi3:/var/www/html

echo cp -r dist/$APPNAME/ $DOCUMENTROOT
cp -r dist/$APPNAME/ $DOCUMENTROOT
#echo "Clean the Apache disk cache:"
#echo "*** Goto rpi3 and run: /etc/apache2/cleanDiskCache.sh ***"
#ng build --prod --base-href /$APPNAME/  \
ssh rpi3 mv $APACHE_ROOT/$APPNAME "$APACHE_ROOT/$APPNAME.$DATE"
scp -r dist/$APPNAME/ rpi3:/var/www/html
echo "Clean the Apache disk cache on rpi3:"
echo "*** Goto rpi3 and run: /etc/apache2/cleanDiskCache.sh ***"
ssh rpi3 /etc/apache2/cleanDiskCache.sh

sudo rm -rf $APACHE_ROOT/$APPNAME \
	&& cp -r dist/$APPNAME/ $APACHE_ROOT
