/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import {
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useToolsPanelDropdownMenuProps } from '../utils/hooks';

/**
 * Renders the `core/comment-author-name` block on the editor.
 *
 * @param {Object} props                       React props.
 * @param {Object} props.setAttributes         Callback for updating block attributes.
 * @param {Object} props.attributes            Block attributes.
 * @param {string} props.attributes.isLink     Whether the author name should be linked.
 * @param {string} props.attributes.linkTarget Target of the link.
 * @param {string} props.attributes.textAlign  Text alignment.
 * @param {Object} props.context               Inherited context.
 * @param {string} props.context.commentId     The comment ID.
 *
 * @return {JSX.Element} React element.
 */
export default function Edit( {
	attributes: { isLink, linkTarget, textAlign },
	context: { commentId },
	setAttributes,
} ) {
	const dropdownMenuProps = useToolsPanelDropdownMenuProps();
	const blockProps = useBlockProps( {
		className: clsx( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	let displayName = useSelect(
		( select ) => {
			const { getEntityRecord } = select( coreStore );

			const comment = getEntityRecord( 'root', 'comment', commentId );
			const authorName = comment?.author_name; // eslint-disable-line camelcase

			if ( comment && ! authorName ) {
				const user = getEntityRecord( 'root', 'user', comment.author );
				return user?.name ?? __( 'Anonymous' );
			}
			return authorName ?? '';
		},
		[ commentId ]
	);

	const blockControls = (
		<BlockControls group="block">
			<AlignmentControl
				value={ textAlign }
				onChange={ ( newAlign ) =>
					setAttributes( { textAlign: newAlign } )
				}
			/>
		</BlockControls>
	);

	const inspectorControls = (
		<InspectorControls>
			<ToolsPanel
				label={ __( 'Settings' ) }
				resetAll={ () => {
					setAttributes( {
						isLink: true,
						linkTarget: '_self',
					} );
				} }
				dropdownMenuProps={ dropdownMenuProps }
			>
				<ToolsPanelItem
					label={ __( 'Link to authors URL' ) }
					isShownByDefault
					hasValue={ () => ! isLink }
					onDeselect={ () =>
						setAttributes( {
							isLink: true,
						} )
					}
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Link to authors URL' ) }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
						checked={ isLink }
					/>
				</ToolsPanelItem>
				{ isLink && (
					<ToolsPanelItem
						label={ __( 'Open in new tab' ) }
						isShownByDefault
						hasValue={ () => linkTarget !== '_self' }
						onDeselect={ () =>
							setAttributes( {
								linkTarget: '_self',
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Open in new tab' ) }
							onChange={ ( value ) =>
								setAttributes( {
									linkTarget: value ? '_blank' : '_self',
								} )
							}
							checked={ linkTarget === '_blank' }
						/>
					</ToolsPanelItem>
				) }
			</ToolsPanel>
		</InspectorControls>
	);

	if ( ! commentId || ! displayName ) {
		displayName = _x( 'Comment Author', 'block title' );
	}

	const displayAuthor = isLink ? (
		<a
			href="#comment-author-pseudo-link"
			onClick={ ( event ) => event.preventDefault() }
		>
			{ displayName }
		</a>
	) : (
		displayName
	);
	return (
		<>
			{ inspectorControls }
			{ blockControls }
			<div { ...blockProps }>{ displayAuthor }</div>
		</>
	);
}
