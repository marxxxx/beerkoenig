using System;
using System.Collections.Generic;

namespace Beerkoenig.Services
{
    public static class Util
    {
        public static TEnum SafeParseEnum<TEnum>(string value, TEnum defaultValue) where TEnum : struct
        {
            if (Enum.TryParse<TEnum>(value, out TEnum result) == false)
                return defaultValue;

            return result;
        }

        public static IEnumerable<List<T>> SplitList<T>(this List<T> locations, int nSize)
        {
            for (int i = 0; i < locations.Count; i += nSize)
            {
                yield return locations.GetRange(i, Math.Min(nSize, locations.Count - i));
            }
        }
    }
}
