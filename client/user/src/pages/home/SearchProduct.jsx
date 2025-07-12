import { useState } from "react";
import { Input, Select, Button, Space, Dropdown } from "antd";
import {
  SearchOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Search } = Input;
const { Option } = Select;

function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics", icon: "🖥️" },
    { value: "fashion", label: "Fashion", icon: "👕" },
    { value: "home-kitchen", label: "Home & Kitchen", icon: "🏠" },
    { value: "books", label: "Books", icon: "📚" },
    { value: "toys-games", label: "Toys & Games", icon: "🎮" },
    { value: "sports-outdoors", label: "Sports & Outdoors", icon: "⚽" },
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        { term: searchTerm, category, timestamp: Date.now() },
        ...recentSearches.filter((item) => item.term !== searchTerm),
      ].slice(0, 5); // Keep only 5 most recent

      setRecentSearches(newRecentSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));

      navigate(
        `/products?search=${encodeURIComponent(
          searchTerm
        )}&category=${category}`
      );
    }
  };

  const filterItems = [
    {
      key: "price_asc",
      label: "Price: Low to High",
    },
    {
      key: "price_desc",
      label: "Price: High to Low",
    },
    {
      key: "newest",
      label: "Newest Arrivals",
    },
    {
      key: "popular",
      label: "Most Popular",
    },
  ];

  const selectBefore = (
    <Select
      value={category}
      onChange={setCategory}
      style={{ width: 140 }}
      dropdownMatchSelectWidth={false}
    >
      {categories.map((cat) => (
        <Option key={cat.value} value={cat.value}>
          {cat.label}
        </Option>
      ))}
    </Select>
  );

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleUseRecentSearch = (item) => {
    setSearchTerm(item.term);
    setCategory(item.category);
    navigate(
      `/products?search=${encodeURIComponent(item.term)}&category=${
        item.category
      }`
    );
  };

  // Generate dropdown items for recent searches
  const recentSearchItems = recentSearches.map((item, index) => ({
    key: `recent_${index}`,
    label: (
      <div
        className="flex items-center cursor-pointer py-2 px-1 hover:bg-gray-50"
        onClick={() => handleUseRecentSearch(item)}
      >
        <span className="mr-2 text-gray-400">🕒</span>
        <span className="flex-1">{item.term}</span>
        <span className="text-xs text-gray-500 ml-2">
          {categories.find((cat) => cat.value === item.category)?.label}
        </span>
      </div>
    ),
  }));

  // Add a clear option if we have recent searches
  if (recentSearchItems.length > 0) {
    recentSearchItems.push({
      type: "divider",
    });
    recentSearchItems.push({
      key: "clear",
      label: (
        <div
          className="flex items-center cursor-pointer py-2 px-1 text-red-500 hover:bg-gray-50"
          onClick={handleClearRecentSearches}
        >
          Clear recent searches
        </div>
      ),
    });
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-2">
        <Dropdown
          menu={{ items: recentSearchItems }}
          placement="bottomLeft"
          trigger={["click"]}
          disabled={recentSearchItems.length === 0}
          overlayClassName="w-full md:w-auto"
        >
          <Search
            addonBefore={selectBefore}
            placeholder="Search for products"
            enterButton={
              <Button
                type="primary"
                icon={<SearchOutlined />}
                className="group"
              >
                <span className="group-hover:animate-pulse">Search</span>
              </Button>
            }
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            className="flex-1 search-input-with-animation"
          />
        </Dropdown>

        <Dropdown
          menu={{ items: filterItems }}
          placement="bottomRight"
          className="hidden md:block"
        >
          <Button
            size="large"
            icon={<FilterOutlined />}
            className="transition-all hover:shadow-md"
          >
            Filter <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      {/* Add some custom animations and styles */}
      <style jsx global>{`
        .search-input-with-animation .ant-input-affix-wrapper:focus,
        .search-input-with-animation .ant-input-affix-wrapper-focused {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-input-with-animation .ant-input-affix-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "Smartphones",
          "Laptops",
          "Headphones",
          "Smartwatches",
          "Cameras",
        ].map((tag) => (
          <Button
            key={tag}
            type="text"
            size="small"
            className="bg-gray-100 dark:bg-gray-800"
            onClick={() => setSearchTerm(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SearchProduct;
