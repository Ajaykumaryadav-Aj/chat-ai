/**
 * MarkdownRenderer.js — Native React Native Markdown & Code Block Renderer
 *
 * Supports:
 * - Paragraphs
 * - Headings (H1, H2, H3)
 * - Bold (**text**)
 * - Italic (*text* or _text_)
 * - Inline code (`code`)
 * - Bullet lists (- or *)
 * - Numbered lists (1., 2., etc.)
 * - Code blocks (```language ... ```) with syntax tag, copy button, and horizontal scrolling
 */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { copyToClipboard } from '../../utils/copyText';
import { colors, radius, spacing, typography } from '../../theme';

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <View style={styles.codeBlockContainer}>
      <View style={styles.codeHeader}>
        <Text style={styles.codeLanguage}>{language || 'code'}</Text>
        <TouchableOpacity style={styles.copyCodeButton} onPress={handleCopy} activeOpacity={0.7}>
          <Text style={styles.copyCodeText}>{copied ? '✓ Copied' : '📋 Copy'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.codeBody}
      >
        <Text style={styles.codeText} selectable>
          {code}
        </Text>
      </ScrollView>
    </View>
  );
};

export const MarkdownRenderer = ({ content = '', isUser = false }) => {
  if (!content) return null;

  // Split by code blocks ```...```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <View style={styles.container}>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // Extract language and code
          const raw = part.slice(3, -3);
          const firstLineEnd = raw.indexOf('\n');
          let language = 'code';
          let code = raw;

          if (firstLineEnd !== -1) {
            const possibleLang = raw.slice(0, firstLineEnd).trim();
            if (possibleLang && !possibleLang.includes(' ')) {
              language = possibleLang;
              code = raw.slice(firstLineEnd + 1);
            }
          }

          return <CodeBlock key={`code_${index}`} language={language} code={code.trim()} />;
        }

        // Process standard text line by line
        const lines = part.split('\n');

        return (
          <View key={`text_block_${index}`}>
            {lines.map((line, lIndex) => {
              const trimmed = line.trim();
              if (!trimmed) {
                return <View key={`line_${lIndex}`} style={styles.lineSpacer} />;
              }

              // Headings
              if (trimmed.startsWith('### ')) {
                return (
                  <Text key={`h3_${lIndex}`} style={[styles.heading3, isUser && styles.userText]}>
                    {parseInlineFormattedText(trimmed.slice(4))}
                  </Text>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <Text key={`h2_${lIndex}`} style={[styles.heading2, isUser && styles.userText]}>
                    {parseInlineFormattedText(trimmed.slice(3))}
                  </Text>
                );
              }
              if (trimmed.startsWith('# ')) {
                return (
                  <Text key={`h1_${lIndex}`} style={[styles.heading1, isUser && styles.userText]}>
                    {parseInlineFormattedText(trimmed.slice(2))}
                  </Text>
                );
              }

              // Bullet item
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const bulletContent = trimmed.substring(2);
                return (
                  <View key={`bullet_${lIndex}`} style={styles.listItemRow}>
                    <Text style={[styles.bulletDot, isUser && styles.userText]}>•</Text>
                    <Text style={[styles.bodyText, styles.listContent, isUser && styles.userText]}>
                      {parseInlineFormattedText(bulletContent)}
                    </Text>
                  </View>
                );
              }

              // Numbered list item: e.g. "1. ", "2. "
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                const num = numMatch[1];
                const listContent = numMatch[2];
                return (
                  <View key={`num_${lIndex}`} style={styles.listItemRow}>
                    <Text style={[styles.numberPrefix, isUser && styles.userText]}>{num}.</Text>
                    <Text style={[styles.bodyText, styles.listContent, isUser && styles.userText]}>
                      {parseInlineFormattedText(listContent)}
                    </Text>
                  </View>
                );
              }

              // Regular paragraph line
              return (
                <Text key={`line_${lIndex}`} style={[styles.bodyText, isUser && styles.userText]}>
                  {parseInlineFormattedText(line)}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

// Helper: parse **bold**, *italic*, and `inline code`
const parseInlineFormattedText = (text) => {
  // Regex splitting by bold, inline code, or italics
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={i} style={styles.boldText}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <Text key={i} style={styles.inlineCode}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <Text key={i} style={styles.italicText}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    return part;
  });
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bodyText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base - 1,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: 4,
  },
  userText: {
    color: '#FFFFFF',
  },
  boldText: {
    fontFamily: typography.fontFamily.bold,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  italicText: {
    fontStyle: 'italic',
    color: colors.text.primary,
  },
  inlineCode: {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    color: colors.chatBot.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  lineSpacer: {
    height: 6,
  },
  // Headings
  heading1: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: spacing.xs,
    marginBottom: 6,
  },
  heading2: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: spacing.xs,
    marginBottom: 4,
  },
  heading3: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.chatBot.secondary,
    marginTop: 4,
    marginBottom: 4,
  },
  // Lists
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingLeft: spacing.xs,
  },
  listContent: {
    flex: 1,
    marginBottom: 0,
  },
  bulletDot: {
    fontSize: 16,
    color: colors.chatBot.primary,
    marginRight: 8,
    lineHeight: 22,
  },
  numberPrefix: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.chatBot.primary,
    marginRight: 8,
    lineHeight: 22,
  },
  // Code Block Styles
  codeBlockContainer: {
    backgroundColor: '#050B14',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 119, 0.30)',
    marginVertical: spacing.sm,
    overflow: 'hidden',
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0A1526',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  codeLanguage: {
    fontFamily: typography.fontFamily.mono,
    fontSize: 11,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
  },
  copyCodeButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  copyCodeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 11,
    color: colors.chatBot.primary,
  },
  codeBody: {
    padding: spacing.md,
    minWidth: '100%',
  },
  codeText: {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm - 1,
    color: '#33DD99',
    lineHeight: 20,
  },
});

export default React.memo(MarkdownRenderer);
