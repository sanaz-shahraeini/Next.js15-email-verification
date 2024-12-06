@echo off
echo Converting to PDF...
pandoc MAGIC_LINK_SETUP.md -o MAGIC_LINK_SETUP.pdf --pdf-engine=wkhtmltopdf

echo Converting to Word...
pandoc MAGIC_LINK_SETUP.md -o MAGIC_LINK_SETUP.docx

echo Conversion complete!
pause
