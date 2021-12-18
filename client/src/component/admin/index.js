import React from 'react';
// import AdminRouter from '../../router/admin/adminRouter';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

export default function Admin() {
    return (
 
        <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <BaseOptionChartStyle />
            {/* <AdminRouter /> */}
        </ThemeConfig>

    )
}
