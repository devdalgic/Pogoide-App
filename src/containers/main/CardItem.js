// /* eslint-disable object-curly-newline */
// import React from 'react';
// import { Image, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';
//
// import GalioTheme, {withGalio} from 'galio-framework'
// import {Block, Icon, Text, theme} from "galio-framework";
// import moment from "moment";
//
// function CardItem({
//                   avatar,
//                   borderless,
//                   caption,
//                   captionColor,
//                   card,
//                   children,
//                   footerStyle,
//                   image,
//                   imageBlockStyle,
//                   imageStyle,
//                   location,
//                   locationColor,
//                   shadow,
//                   style,
//                   styles,
//                   title,
//                   titleColor,
//                   theme,
//                   ISO,
//                   start, end,
//                   ...props
//               }) {
//     function renderImage() {
//         if (!image) return null;
//         return (
//             <Block card style={[styles.imageBlock, imageBlockStyle]}>
//                 <Image source={{ uri: image }} style={[styles.image, imageStyle]} />
//             </Block>
//         );
//     }
//
//     function renderAvatar() {
//         if (!avatar) return null;
//         return <Image source={{ uri: avatar }} style={styles.avatar} />;
//     }
//
//     function renderLocation() {
//         if (!location) return null;
//         if (typeof location !== 'string') {
//             return location;
//         }
//
//         return (
//             <Block row right>
//                 <Icon
//                     name="map-pin"
//                     family="feather"
//                     color={locationColor || theme.COLORS.MUTED}
//                     size={theme.SIZES.FONT}
//                 />
//                 <Text
//                     muted
//                     size={theme.SIZES.FONT * 0.875}
//                     color={locationColor || theme.COLORS.MUTED}
//                     style={{ marginLeft: theme.SIZES.BASE * 0.25 }}>
//                     {location}
//                 </Text>
//             </Block>
//         );
//     }
//
//     function renderAuthor() {
//         if (ISO){
//             start = moment(start).format("dddd, MMM DD at HH:mm a");
//             end = moment(end).format("dddd, MMM DD at HH:mm a");
//         }
//         return (
//             <Block flex row style={[styles.footer, footerStyle]} space="between">
//                 <Block flex={1.7}>
//                     <Block style={styles.title}>
//                         <Text size={theme.SIZES.FONT * 0.875} color={titleColor}>
//                             {title}
//                         </Text>
//                     </Block>
//                     <Block row space="between">
//                         <Block row right>
//                             <Text p muted size={theme.SIZES.FONT * 0.875} color={captionColor}>
//                                 Starts: {start}
//                                 Ends: {end}
//                             </Text>
//                         </Block>
//                     </Block>
//                 </Block>
//             </Block>
//         );
//     }
//
//
//     const styleCard = [borderless && { borderWidth: 0 }, style];
//
//     return (
//         <Block {...props} card={card} shadow={shadow} style={styleCard} shadowColor={theme.COLORS.FACEBOOK}>
//             {renderImage()}
//             {renderAuthor()}
//             {children}
//         </Block>
//     );
// }
//
// CardItem.defaultProps = {
//     card: true,
//     shadow: true,
//     borderless: false,
//     styles: {},
//     theme: GalioTheme,
//     title: '',
//     titleColor: '',
//     caption: '',
//     captionColor: '',
//     footerStyle: {},
//     avatar: '',
//     ISO: false,
//     start: '',
//     end: '',
// };
//
// CardItem.propTypes = {
//     card: PropTypes.bool,
//     shadow: PropTypes.bool,
//     borderless: PropTypes.bool,
//     styles: PropTypes.any,
//     theme: PropTypes.any,
//     title: PropTypes.string,
//     titleColor: PropTypes.string,
//     caption: PropTypes.string,
//     captionColor: PropTypes.string,
//     avatar: PropTypes.string,
//     footerStyle: PropTypes.object,
//     ISO: PropTypes.bool,
//     start: PropTypes.string,
//     end: PropTypes.string,
// };
//
// const styles = ItemTheme =>
//     StyleSheet.create({
//         card: {
//             borderColor: ItemTheme.COLORS.FACEBOOK,
//             backgroundColor: ItemTheme.COLORS.WHITE,
//             width: ItemTheme.SIZES.CARD_WIDTH,
//         },
//         footer: {
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             paddingHorizontal: ItemTheme.SIZES.CARD_FOOTER_HORIZONTAL,
//             paddingVertical: ItemTheme.SIZES.CARD_FOOTER_VERTICAL,
//             backgroundColor: ItemTheme.COLORS.TRANSPARENT,
//             zIndex: 1,
//         },
//         avatar: {
//             width: ItemTheme.SIZES.CARD_AVATAR_WIDTH,
//             height: ItemTheme.SIZES.CARD_AVATAR_HEIGHT,
//             borderRadius: ItemTheme.SIZES.CARD_AVATAR_RADIUS,
//         },
//         title: {
//             justifyContent: 'center',
//         },
//         imageBlock: {
//             borderWidth: 0,
//             overflow: 'hidden',
//         },
//         image: {
//             width: 'auto',
//             height: ItemTheme.SIZES.CARD_IMAGE_HEIGHT,
//         },
//         round: {
//             borderRadius: ItemTheme.SIZES.CARD_ROUND,
//         },
//         rounded: {
//             borderRadius: ItemTheme.SIZES.CARD_ROUNDED,
//         },
//     });
//
// export default withGalio(CardItem, styles);