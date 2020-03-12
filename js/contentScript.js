$('.r ').each(function (i, object) {
    // $(this).append("<img src='https://firebasestorage.googleapis.com/v0/b/fake-news-apocalypse.appspot.com/o/icon_undefined.png?alt=media&token=1a94b3c0-79b4-400a-9da1-da13c6fd54f4'/>");
    let link = $(this).find('a:first').attr('href');
    console.log(i + link)
});