import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  FolderPlus, 
  Sparkles, 
  Flame, 
  Drumstick, 
  Pizza, 
  Sandwich, 
  Utensils, 
  Coffee, 
  UtensilsCrossed, 
  Check, 
  AlertCircle, 
  Layers,
  X
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { MenuCategory } from '../../types';

const AVAILABLE_ICONS = [
  { id: 'Drumstick', label: 'Chicken / Broast', icon: <Drumstick className="w-4 h-4" /> },
  { id: 'Pizza', label: 'Pizza & Crust', icon: <Pizza className="w-4 h-4" /> },
  { id: 'Sandwich', label: 'Burgers & Sandwiches', icon: <Sandwich className="w-4 h-4" /> },
  { id: 'Utensils', label: 'Fries & Appetizers', icon: <Utensils className="w-4 h-4" /> },
  { id: 'Coffee', label: 'Beverages & Drinks', icon: <Coffee className="w-4 h-4" /> },
  { id: 'Flame', label: 'Hot & Spicy / BBQ', icon: <Flame className="w-4 h-4" /> },
  { id: 'UtensilsCrossed', label: 'Platters & Meals', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: 'Sparkles', label: 'Chef Specials / Desserts', icon: <Sparkles className="w-4 h-4" /> },
];

export const OwnerCategoriesTab: React.FC = () => {
  const { categories, menuItems, addCategory, updateCategory, deleteCategory } = useMenu();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [urduName, setUrduName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Flame');
  const [errorMessage, setErrorMessage] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<MenuCategory | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleStartCreate = () => {
    setEditingCategory(null);
    setName('');
    setUrduName('');
    setDescription('');
    setIcon('Flame');
    setErrorMessage('');
    setIsCreatingNew(true);
  };

  const handleStartEdit = (cat: MenuCategory) => {
    setIsCreatingNew(false);
    setEditingCategory(cat);
    setName(cat.name);
    setUrduName(cat.urduName || '');
    setDescription(cat.description || '');
    setIcon(cat.icon || 'Flame');
    setErrorMessage('');
  };

  const handleCloseForm = () => {
    setIsCreatingNew(false);
    setEditingCategory(null);
    setErrorMessage('');
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Category name is required.');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: name.trim(),
        urduName: urduName.trim() || undefined,
        description: description.trim() || undefined,
        icon: icon.trim() || 'Sparkles',
      });
      showToast(`Category "${name}" updated!`);
      handleCloseForm();
    } else {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const existing = categories.find(c => c.id === slug || c.name.toLowerCase() === name.trim().toLowerCase());
      if (existing) {
        setErrorMessage('A category with this name already exists. Please choose another name.');
        return;
      }

      addCategory({
        id: slug || `cat-${Date.now()}`,
        name: name.trim(),
        urduName: urduName.trim() || undefined,
        description: description.trim() || undefined,
        icon: icon.trim() || 'Sparkles',
      });
      showToast(`New category "${name}" added to menu!`);
      handleCloseForm();
    }
  };

  const handleDeleteConfirm = () => {
    if (!categoryToDelete) return;
    const res = deleteCategory(categoryToDelete.id);
    if (res.success) {
      showToast(res.message);
    } else {
      alert(res.message);
    }
    setCategoryToDelete(null);
  };

  const getCategoryIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Drumstick': return <Drumstick className="w-5 h-5" />;
      case 'Pizza': return <Pizza className="w-5 h-5" />;
      case 'Sandwich': return <Sandwich className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto space-y-6">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="p-3 bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-between animate-in fade-in">
          <span>{successToast}</span>
          <button onClick={() => setSuccessToast(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B91C1C]" />
            <span>Menu Categories & Sections</span>
            <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full font-bold">
              {categories.length} Categories
            </span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Create custom menu sections (e.g. Seafood, Shakes, Pasta, Chinese, Desserts) with icons and Urdu labels.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <FolderPlus className="w-4 h-4" />
          <span>+ Add New Category</span>
        </button>
      </div>

      {/* Category Creation / Edit Modal or Inline Card */}
      {(isCreatingNew || editingCategory) && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#B91C1C] shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-[#B91C1C]" />
              <span>{editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Custom Category'}</span>
            </h4>
            <button
              onClick={handleCloseForm}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Category Name in English * (e.g. Pasta & Lasagna, Fresh Juices)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Loaded Shawarmas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-900 font-bold focus:border-[#B91C1C] focus:outline-none bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Urdu Name / کیٹیگری کا نام (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. شوارما اور رول"
                  value={urduName}
                  onChange={(e) => setUrduName(e.target.value)}
                  dir="rtl"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-900 font-bold focus:border-[#B91C1C] focus:outline-none bg-gray-50 text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Category Description / Tagline (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Freshly wrapped authentic Arabian spiced chicken shawarmas"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#B91C1C] focus:outline-none bg-gray-50"
              />
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Choose Display Icon
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AVAILABLE_ICONS.map((ic) => (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => setIcon(ic.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      icon === ic.id
                        ? 'border-[#B91C1C] bg-red-50 text-[#B91C1C] ring-2 ring-red-200'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    <span className={icon === ic.id ? 'text-[#B91C1C]' : 'text-gray-500'}>
                      {ic.icon}
                    </span>
                    <span className="truncate">{ic.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCloseForm}
                className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#B91C1C] hover:bg-red-700 text-white font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const itemCount = menuItems.filter(
            (i) => i.category.toLowerCase() === cat.id.toLowerCase()
          ).length;

          return (
            <div
              key={cat.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#B91C1C] flex items-center justify-center font-bold">
                    {getCategoryIconComponent(cat.icon)}
                  </div>
                  <div className="flex items-center gap-1">
                    {cat.isDefault ? (
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold">
                        Default
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        Custom
                      </span>
                    )}
                    <span className="text-[10px] bg-red-100 text-[#B91C1C] px-2 py-0.5 rounded-full font-black">
                      {itemCount} {itemCount === 1 ? 'dish' : 'dishes'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-gray-900 text-sm flex items-center justify-between">
                    <span>{cat.name}</span>
                    {cat.urduName && (
                      <span className="text-xs text-gray-500 font-urdu font-medium" dir="rtl">
                        {cat.urduName}
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                    Category ID: <span className="text-gray-700 font-bold">{cat.id}</span>
                  </p>
                  {cat.description && (
                    <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => handleStartEdit(cat)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-gray-600" />
                  <span>Edit</span>
                </button>

                {!cat.isDefault && (
                  <button
                    onClick={() => setCategoryToDelete(cat)}
                    className="px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-gray-900">
                Delete Category "{categoryToDelete.name}"?
              </h3>
              <p className="text-xs text-gray-500">
                This custom category will be removed from your menu bar and item filters.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
