<?php

namespace App\Actions\Documents;

class SanitizeDocumentContentAction
{
    public function execute(string $content): string
    {
        $content = strip_tags($content, '<p><br><strong><b><em><i><u><h1><h2><h3><ul><ol><li>');
        $content = preg_replace('/<(p|br|strong|b|em|i|u|h1|h2|h3|ul|ol|li)\b[^>]*>/i', '<$1>', $content) ?? '';

        return trim($content) !== '' ? $content : '<p></p>';
    }
}
