
OCOOKIES_UNROTATED=drugs misandry privates sex astrology ethnic \
	miscellaneous racism songs-poems black-humor hphobia misogyny \
	religion vulgarity definitions limerick politics riddles        

OCOOKIES_ROTATED=

OCOOKIES=$(OCOOKIES_UNROTATED) $(OCOOKIES_ROTATED)

STRFILE=../../util/strfile
ROT=../../util/rot


all:	ocookies-stamp

ocookies-stamp:	rotated-stamp
	rm -f *.dat
	for i in $(OCOOKIES) ; do $(STRFILE) -x $$i || exit $$? ; done
	touch ocookies-stamp

rotated-stamp:
	for i in $(OCOOKIES_UNROTATED) ; \
	    do $(ROT) < unrotated/$$i > $$i || exit $$? ; done
	touch rotated-stamp

install:
	install -m 0755 -d $(OCOOKIEDIR)
	for i in $(OCOOKIES) ; \
	    do install -m 0644 $$i $$i.dat $(OCOOKIEDIR) || exit $$? ; done

clean:
	rm -f ocookies-stamp rotated-stamp *.dat $(OCOOKIES_UNROTATED)
