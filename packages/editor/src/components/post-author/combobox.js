/**
 * WordPress dependencies
 */
import { debounce } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { ComboboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { useAuthorsQuery } from './hook';

export default function PostAuthorCombobox() {
	const [ fieldValue, setFieldValue ] = useState();

	const { editPost } = useDispatch( editorStore );
	const { authorId, authorOptions, isLoading } =
		useAuthorsQuery( fieldValue );

	/**
	 * Handle author selection.
	 *
	 * @param {number} postAuthorId The selected Author.
	 */
	const handleSelect = ( postAuthorId ) => {
		if ( ! postAuthorId ) {
			return;
		}
		editPost( { author: postAuthorId } );
	};

	return (
		<ComboboxControl
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			label={ __( 'Author' ) }
			options={ authorOptions }
			value={ authorId }
			onFilterValueChange={ debounce( setFieldValue, 300 ) }
			onChange={ handleSelect }
			allowReset={ false }
			hideLabelFromVision
			isLoading={ isLoading }
		/>
	);
}
