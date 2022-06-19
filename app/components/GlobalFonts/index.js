import { createGlobalStyle } from 'styled-components';

import FontWoff from './SVNGilroyLight/SVNGilroy.woff';
import FontTtf from './SVNGilroyLight/SVNGilroy.ttf';
import FontEot from './SVNGilroyLight/SVNGilroy.eot';
import FontSvg from './SVNGilroyLight/SVNGilroy.svg';

import FontBoldWoff from './SVNGilroyBold/SVNGilroy.woff';
import FontBoldTtf from './SVNGilroyBold/SVNGilroy.ttf';
import FontBoldEot from './SVNGilroyBold/SVNGilroy.eot';
import FontBoldSvg from './SVNGilroyBold/SVNGilroy.svg';

export default createGlobalStyle`
    @font-face {
        font-family: 'SVN-Gilroy';
        src: url(${FontEot});
        src: local('☺'),
        url(${FontWoff}) format('woff'),
        url(${FontTtf}) format('truetype'),
        url(${FontSvg}) format('svg');
    }

    @font-face {
        font-family: 'SVN-Gilroy Bold';
        src: url(${FontBoldEot});
        src: local('☺'),
        url(${FontBoldWoff}) format('woff'),
        url(${FontBoldTtf}) format('truetype'),
        url(${FontBoldSvg}) format('svg');
    }
`;