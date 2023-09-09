export interface GroupBlockDictType {
  start: string;
  end: string;
}
export const groupBlockDict = {
  quotation: {
    start: `'`,
    end: `'`,
  },
  doubleQuotation: {
    start: `"`,
    end: `"`,
  },
  parenthesis: {
    start: `(`,
    end: `)`,
  },
  brackets: {
    start: `[`,
    end: `]`,
  },
};
