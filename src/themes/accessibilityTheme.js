// themeAccessibility.js


const lightTheme = {
    token: {
        // צבעים כלליים
        colorPrimary: '#3D52A0', // צבע ראשי לממשק
        colorBgBase: '#F0F0F0', // רקע בסיסי בהיר
        colorBgContainer: '#fff', // רקע עבור קונטיינרים/כרטיסים

        // טקסט
        colorTextBase: '#000000', // טקסט ראשי בצבע שחור לניגודיות מקסימלית
        colorTextSecondary: '#595959', // טקסט משני בגוון כהה יותר
        colorTextHeading: '#3D52A0', // כותרות בצבע ראשי להדגשה

        // גבולות והצלחות
        colorBorder: '#ADBBDD', // גבולות עדינים אך נראים
        colorSuccess: '#52c41a', // צבע הצלחה
        colorWarning: '#faad14', // צבע אזהרה
        colorError: '#ff4d4f', // צבע שגיאה

        // כפתורים
        colorButtonBg: '#7091E6', // צבע רקע כפתורים עדין אך מובחן
        colorButtonText: '#FFFFFF', // טקסט כפתורים בצבע לבן
        colorButtonHoverBg: '#8697C4', // צבע רקע כפתורים בהובר
        colorButtonBorder: '#7091E6', // גבול כפתורים תואם

        // כותרת והדר
        colorHeaderBg: '#fffffe', // רקע כהה להדר
        colorHeaderText: '#000', // טקסט בהיר וניגודי בהדר

        colorFooterBg: '#fffffe', // רקע כהה להדר
        colorFooterText: '#000', // טקסט בהיר וניגודי בהדר

        // צבע רקע מרכזי
        colorMainBg: '#fff', // רקע עיקרי באתר
    },
};


const darkTheme = {
    token: {
        colorPrimary: '#1DA57A', // צבע ראשי
        colorBgBase: '#121212', // צבע רקע בסיסי כהה
        colorBgContainer: '#1c1c1c', // צבע רקע עבור קונטיינרים
        colorTextBase: '#ffffff', // צבע טקסט בסיסי
        colorTextSecondary: '#b0b0b0', // צבע טקסט משני
        colorTextHeading: '#ffffff', // צבע טקסט עבור כותרות
        colorBorder: '#444444', // צבע גבול
        colorSuccess: '#52c41a', // צבע הצלחה
        colorWarning: '#faad14', // צבע אזהרה
        colorError: '#ff4d4f', // צבע שגיאה

        // צבעי כפתורים
        colorButtonBg: '#1DA57A', // צבע רקע לכפתורים
        colorButtonText: '#ffffff', // צבע טקסט בכפתורים
        colorButtonHoverBg: '#148e5d', // צבע רקע כפתורים בה.hover
        colorButtonBorder: '#1DA57A', // צבע גבול לכפתורים

        // צבעי כותרת והדר
        colorHeaderBg: '#1c1c1c', // צבע רקע להדר
        colorHeaderText: '#ffffff', // צבע טקסט בהדר
    },
};



export { darkTheme, lightTheme };
