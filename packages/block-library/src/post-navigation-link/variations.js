/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { next, previous } from '@wordpress/icons';

const variations = [
	{
		name: 'post-previous',
		title: __( 'Previous Post' ),
		description: __(
			'Displays the post link that precedes the current post.'
		),
		icon: previous,
		attributes: { type: 'previous' },
		scope: [ 'inserter', 'transform' ],
		example: {
			attributes: {
				label: __( 'Previous post' ),
				arrow: 'arrow',
			},
		},
	},
	{
		isDefault: true,
		name: 'post-next',
		title: __( 'Next Post' ),
		description: __(
			'Displays the post link that follows the current post.'
		),
		icon: next,
		attributes: { type: 'next' },
		scope: [ 'inserter', 'transform' ],
		example: {
			attributes: {
				label: __( 'Next post' ),
				arrow: 'arrow',
			},
		},
	},
];

/**
 * Add `isActive` function to all `post-navigation-link` variations, if not defined.
 * `isActive` function is used to find a variation match from a created
 *  Block by providing its attributes.
 */
variations.forEach( ( variation ) => {
	if ( variation.isActive ) {
		return;
	}
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.type === variationAttributes.type;
} );

export default variations;
