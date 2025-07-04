/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { moreVertical } from '@wordpress/icons';

function Warning( { className, actions, children, secondaryActions } ) {
	return (
		<div style={ { display: 'contents', all: 'initial' } }>
			<div className={ clsx( className, 'block-editor-warning' ) }>
				<div className="block-editor-warning__contents">
					<p className="block-editor-warning__message">
						{ children }
					</p>

					{ ( actions?.length > 0 || secondaryActions ) && (
						<div className="block-editor-warning__actions">
							{ actions?.length > 0 &&
								actions.map( ( action, i ) => (
									<span
										key={ i }
										className="block-editor-warning__action"
									>
										{ action }
									</span>
								) ) }
							{ secondaryActions && (
								<DropdownMenu
									className="block-editor-warning__secondary"
									icon={ moreVertical }
									label={ __( 'More options' ) }
									popoverProps={ {
										placement: 'bottom-end',
										className:
											'block-editor-warning__dropdown',
									} }
									noIcons
								>
									{ () => (
										<MenuGroup>
											{ secondaryActions.map(
												( item, pos ) => (
													<MenuItem
														onClick={ item.onClick }
														key={ pos }
													>
														{ item.title }
													</MenuItem>
												)
											) }
										</MenuGroup>
									) }
								</DropdownMenu>
							) }
						</div>
					) }
				</div>
			</div>
		</div>
	);
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/warning/README.md
 */
export default Warning;
